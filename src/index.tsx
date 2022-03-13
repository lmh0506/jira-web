import './wdyr'; 
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadDevTools } from 'jira-dev-tool'
import 'antd/dist/antd.less'
import { AppProviders } from './context/index'
import {  QueryClient, QueryClientProvider } from 'react-query';

loadDevTools(() => {
  const queryClient = new QueryClient();
  ReactDOM.render(
    <React.StrictMode>
      <QueryClientProvider client={ queryClient }>
        <AppProviders>
          <App />
        </AppProviders>
      </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
