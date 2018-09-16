'use strict';

import '../styles/index.scss';

import $ from 'jquery';
import axios from 'axios';
import io from 'socket.io-client';

$(document).ready(() => {
  const socket = io();

  const $cursor = $('#cursor');
  
  socket.on('gzdoom.stdout', (message, date) => {
    const $command = $('<div/>', { class: 'command' }).append(
      $('<span/>', { class: 'prompt' }).text('user@doom $ '), 
      $('<pre/>').text(message)
    );

    $cursor.before($command);
    $cursor[0].scrollIntoView();
  });
  
  socket.on('gzdoom.stderr', console.error);
  
  $('#doom-play').on('click', () => {
    axios({
      method: 'post',
      url: '/api/play',
    });
  });
});