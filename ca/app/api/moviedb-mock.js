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


module.exports = function() {
  console.log('WARNING: The TMDB_API_KEY was not specified '+
    'so you will be using a mock of the TMDB API responses');
  return {
    /**
     * Search for movies based on the parameters provided
     * by the user during the dialog
     */
    searchMovies: function(params, callback) {
      var results = {
        page: 1,
        total_pages: 1,
        total_movies: 3,
        curent_index: 3,
        movies: [{
          movie_id: 0,
          movie_name: 'MOCK: Star Wars: The Force Awakens'
        }, {
          movie_id: 1,
          movie_name: 'MOCK: Zoolander 2'
        }, {
          movie_id: 2,
          movie_name: 'MOCK: Batman v Superman'
        }]
      };
      return callback(null, results);
    },

    /**
     * Returns movie information based on the movie_id
     */
    getMovieInformation: function(params, callback) {
      var movies = [{
        fake: true,
        movie_id: 0,
        movie_name: 'MOCK: Star Wars: The Force Awakens',
        runtime: 136,
        popularity: 8.5,
        poster_path: 'http://image.tmdb.org/t/p/w300//fYzpM9GmpBlIC893fNjoWCwE24H.jpg',
        trailer_url: 'https://www.youtube.com/embed/sGbxmsDFVnE?controls=0&amp;showinfo=0',
        certification: 'PG-13',
        release_date: '2015-12-14',
        overview: 'This is static information, check the README file in Github to '+
        'know how to use real data from themoviedb.com'
      }, {
        fake: true,
        movie_id: 1,
        movie_name: 'MOCK: Zoolander 2',
        runtime: 100,
        popularity: 4.2,
        poster_path: 'http://image.tmdb.org/t/p/w300//fnY5UDKdopZnGvzgbJIz9fAFImx.jpg',
        trailer_url: 'https://www.youtube.com/embed/U-CNKSzxIXM?controls=0&amp;showinfo=0',
        certification: '',
        release_date: '2016-02-12',
        overview: 'This is static information, check the README file in Github to '+
        'know how to use real data from themoviedb.com'
      }, {
        fake: true,
        movie_id: 2,
        movie_name: 'MOCK: Batman v Superman',
        runtime: 145,
        popularity: 7.5,
        poster_path: 'http://image.tmdb.org/t/p/w300//eJrlh2g9UGAd7R6mQAOQIIs329H.jpg',
        trailer_url: 'https://www.youtube.com/embed/nIGtF3J5kn8?controls=0&amp;showinfo=0',
        certification: '',
        release_date: '2016-01-05',
        overview: 'This is static information, check the README file in Github to '+
        'know how to use real data from themoviedb.com'
      }
    ];
    return callback(null, movies[params.movie_id]);
    }
  };
};
