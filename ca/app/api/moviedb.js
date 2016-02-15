/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var request = require('request');
var moment = require('moment');
var util = require('util');

var MOVIE_URL = 'http://api.themoviedb.org/3/movie/';
var DISCOVER_URL = 'http://api.themoviedb.org/3/discover/movie';
var GENRE_URL = 'http://api.themoviedb.org/3/genre/movie/list';
var POSTER_BASE_URL = 'http://image.tmdb.org/t/p/w300/';
var YOUTUBE_TRAILER_URL = 'https://www.youtube.com/embed/%s?controls=0&amp;showinfo=0';
var TMDB_PAGE_SIZE = 20;
var RESULT_SIZE = 10;

/**
 * Returns the YouTube trailer if exists
 */
function getTrailer(movie) {
  var videos = movie.videos.results;
  var index = videos
    .map(function(e) { return e.type + e.site; })
    .indexOf('TrailerYouTube');

  if (index !== -1) {
    return util.format(YOUTUBE_TRAILER_URL, videos[index].key);
  } else {
    return '';
  }
}

/**
 * Returns the Popularity only if the movie has more than 10 votes
 */
function getPopularity(movie) {
  if (movie.vote_count >= 10) {
    return movie.vote_average;
  } else {
    return -1;
  }
}

/**
 * Returns the US release information
 */
function getUSRelease(movie) {
  var index = movie.releases.countries
    .map(function(e) { return e.iso_3166_1; }).indexOf('US');

  if (index !== -1)
    return movie.releases.countries[index];
  else
    return {};
}

/**
 * Returns the US release date
 */
function getReleaseDate(movie) {
  return getUSRelease(movie).release_date || '';
}

/**
 * Returns the US movie poster if exits
 */
function getPoster(movie) {
  if (movie.poster_path)
    return POSTER_BASE_URL + movie.poster_path;
  else
    return '';
}

/**
 * Returns the genre id based on a genre name and the genres list
 * @param  {[type]} name   The genre name: Comedy, Drama, Horror,...
 * @param  {[type]} genres The genre array
 */
function getGenre(name, genres) {
  var index = genres.map(function(e) { return e.name; }).indexOf(name);
  if (index !== -1)
    return genres[index];
  else
    return {};
}

module.exports = function(key) {
  var tmdbRequest = request.defaults({
    qs: {api_key: key}
  });

  // initialize the genres array
  var genres = [];
  tmdbRequest(GENRE_URL, function(err, resp, body) {
    if (!err)
      genres = JSON.parse(body.toLowerCase()).genres;
  });


  return {
    /**
     * Search for movies based on the parameters provided
     * by the user during the dialog
     */
    searchMovies: function(params, callback) {
      var today = moment().format('YYYY-MM-DD');
      var lastMonth = moment().month(-1).format('YYYY-MM-DD');
      var next6Months = moment().month(6).format('YYYY-MM-DD');

      var query = {
        sort_by: 'popularity.desc',
        'primary_release_date.gte': (params.recency === 'current' ?  lastMonth : today),
        'primary_release_date.lte': (params.recency === 'current' ?  today : next6Months)
      };

      // ratings: R, G, PG, PG-13
      if (params.rating) {
        query.certification_country = 'US';
        query.certification = params.rating.toUpperCase();
      }

      // genre
      var genre = getGenre(params.genre, genres);
      if (genre.id)
        query.with_genres = genre.id;

      params.index = parseInt(params.index);
      if (params.page === 'previous')
        params.index = params.index - Math.min(RESULT_SIZE * 2, params.index);

      query.page = Math.floor(params.index / TMDB_PAGE_SIZE) + 1;
      var index = params.index % TMDB_PAGE_SIZE >= 10 ? 10 : 0;

      // TMDB API call
      tmdbRequest({ url: DISCOVER_URL, qs: query, json:true }, function(err, res, body) {
        if (err)
          return callback(err);

        var top10movies = body.results
        .slice(index, index + Math.min(RESULT_SIZE, body.results.length - index))
        .map(function(movie) {
          return {
            movie_id: movie.id,
            movie_name: movie.title
          };
        });

        var results = {
          page: body.page,
          total_pages: body.total_pages,
          total_movies: body.total_results,
          movies: top10movies,
          curent_index: params.index + top10movies.length
        };
        return callback(null, results);
      });
    },

    /**
     * Returns movie information based on the movie_id
     */
    getMovieInformation: function(params, callback) {
      tmdbRequest({
        url: MOVIE_URL + params.movie_id,
        qs: { append_to_response: 'releases,videos' },
        json:true
      }, function(err, res, body) {
        if (err)
          return callback(err, body);

        var movie = {
          movie_id: body.id,
          movie_name: body.title,
          overview: body.overview,
          runtime: body.runtime,
          popularity: getPopularity(body),
          poster_path: getPoster(body),
          trailer_url: getTrailer(body),
          certification: getUSRelease(body).certification || '',
          release_date: getReleaseDate(body)
        };

        return callback(null, movie);
      });
    }
  };
};
