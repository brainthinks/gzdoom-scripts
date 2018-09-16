'use strict';

import '../styles/index.scss';

import $ from 'jquery';
import axios from 'axios';

$(document).ready(() => {
  $('#doom-play').on('click', () => {
    axios({
      method: 'post',
      url: '/api/play',
    });
  });
});