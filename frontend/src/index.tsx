import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import faIR from 'antd/lib/locale-provider/fa_IR';
import App from './App';
import { register } from './serviceWorker';
import i18next from 'i18next';
import { i18nClient } from './i18n';

const antResources = {
  ir: faIR,
	en: enUS,
	'en-US': enUS,
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

i18next.changeLanguage("ir");

const render = Component => {
	const rootElement = document.getElementById('root');
	ReactDom.render(
		<AppContainer>
			<LocaleProvider locale={antResources[i18next.language]}>
				<Component />
			</LocaleProvider>
		</AppContainer>,
		rootElement,
	);
};

i18nClient();

render(App);

register();

if (module.hot) {
	module.hot.accept('./App', () => {
		render(App);
	});
}
