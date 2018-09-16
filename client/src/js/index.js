'use strict';

import '../styles/index.scss';

import $ from 'jquery';
import axios from 'axios';
import io from 'socket.io-client';

$(document).ready(() => {
  const socket = io();

  // $('#doom-play').on('click', () => {
  //   axios({
  //     method: 'post',
  //     url: '/api/play',
  //   });
  // });
});