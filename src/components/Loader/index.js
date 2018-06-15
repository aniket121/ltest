import React from 'react';
import Halogen from 'halogen';

export default ({ color = '#1321a2' }) => (
  <Halogen.ScaleLoader color={color} />
);
