/*
 * @Descripttion:
 * @Author: huangzihong
 * @Date: 2021-04-26 11:02:43
 * @LastEditors: huangzihong
 * @LastEditTime: 2021-04-26 11:53:56
 */
/**
 * @Author: junlan.he
 * @date: 2021/4/25
 * @desc:
 */
import { reactive } from 'vue'

export const ParticlesOptions: Object = reactive({
  fpsLimit: 60,
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onClick: {
        enable: true,
        mode: ['push', 'grab'],
      },
      onHover: {
        enable: true,
        mode: ['grab'],
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 1,
      },
      attract: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#ffffff',
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 400,
      },
      value: 45,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      random: true,
      value: 3,
    },
  },
  detectRetina: true,
})
