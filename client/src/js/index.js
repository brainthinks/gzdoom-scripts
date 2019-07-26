'use strict';

import '../styles/index.scss';

import 'babel-polyfill';

import $ from 'jquery';
import axios from 'axios';
import io from 'socket.io-client';

function generateCommand (type, application, date, message) {
  const $command = $('<div/>', { class: `command ${application}` }).append(
    $('<span/>', { class: 'timestamp' }).text(date),
    $('<span/>', { class: 'prompt' }).text(`${application} $ `),
    $('<pre/>', { class: type }).text(message)
  );

  return $command;
}

$(document).ready(async () => {
  const socket = io();

  const $cursor = generateCommand('stdout', '', Date.now(), '_');

  $cursor.find('pre').addClass('blink');

  $('.terminal .console .output').append($cursor);

  function displayCommand ($command) {
    $cursor.before($command);
    $cursor[0].scrollIntoView();
  }

  socket.on('gzdoom.stdout', (message, date) => {
    displayCommand(generateCommand('stdout', 'gzdoom', date, message));
  });

  socket.on('gzdoom.stderr', (message, date) => {
    displayCommand(generateCommand('stderr', 'gzdoom', date, message));
  });

  socket.on('ffmpeg.stdout', (message, date) => {
    displayCommand(generateCommand('stdout', 'ffmpeg', date, message));
  });

  socket.on('ffmpeg.stderr', (message, date) => {
    displayCommand(generateCommand('stderr', 'ffmpeg', date, message));
  });

  const {
    data,
  } = await axios({
    method: 'get',
    url: '/api/presets',
  });

  console.log(data);

  for (let i = 0; i < data.length; i++) {
    const preset = data[i];

    const $button = $('<button/>', {
      id: `play-${preset}`,
      class: 'btn',
      text: `Play ${preset} Doom`,
      click: async () => {
        const { data } = await axios({
          method: 'post',
          url: `/api/play/${preset}`,
        });

        console.log(data);
      },
    });

    $('#buttons').append($button);
  }
});
