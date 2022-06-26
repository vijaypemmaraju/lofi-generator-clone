import React, { FC } from 'react';
import { render } from 'react-dom';
import App from './App';

const Root: FC = () => <App />;

render(<Root />, document.getElementById('ui'));
