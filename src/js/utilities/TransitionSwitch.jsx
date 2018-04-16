import React from 'react';
import {  AnimatedSwitch, spring } from 'react-router-transition';
import mapObj from './MapObj';

function mapStyles(styles) {
  return {
    transform: `rotateX(${styles.rotateX1}deg) translateY(${styles.translateY1}%) rotateX(${styles.rotateX2}deg) translateY(${styles.translateY1}%) rotateX(${styles.rotateX3}deg)`,
    transformOrigin: `0 ${styles.transformOrigin}%`,
  };
}

function bounce(val) {
  return spring(val, {
    stiffness: 150,
    damping: 15,
  });
}

// child matches will...
const bounceTransition = {
  atEnter: { //no bounce on enter
    rotateX1: 90,
    rotateX2: -90,
    rotateX3: 90,
    translateY1: 50,
    translateY2: 50,
    transformOrigin: 100,
  },
  atLeave: {
    rotateX1: -90,
    rotateX2: 0,
    rotateX3: 0,
    translateY1: -50,
    translateY2: 0,
    transformOrigin: 0,
  },
  atActive: {
    rotateX1: 0,
    rotateX2: 0,
    rotateX3: 0,
    translateY1: 0,
    translateY2: 0,
    transformOrigin: 25,
  },
};

const addBounceToAll = ([k, v]) => {
  return {[k]: bounce(v) };
};

const TransitionSwitch = props => (
  <AnimatedSwitch 
    atEnter={bounceTransition.atEnter}
    atLeave={mapObj(bounceTransition.atLeave, addBounceToAll)}
    atActive={mapObj(bounceTransition.atActive, addBounceToAll)}
    mapStyles={mapStyles}
    runOnMount={true}
    {...props} />
);

export default TransitionSwitch;