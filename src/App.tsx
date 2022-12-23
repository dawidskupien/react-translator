import { useState } from 'react';
import TranslatorScreen from './features/translator/TranslatorScreen';
import Header from './lib/components/Header';
import Footer from './lib/components/Footer';

function App() {
  const [appLanguage, setAppLanguage] = useState<string>('US');
  return (
    <div className="h-screen">
      <Header setAppLanguage={setAppLanguage} appLanguage={appLanguage} />
      <TranslatorScreen appLanguage={appLanguage} />
      <Footer appLanguage={appLanguage} />
    </div>
  );
}

export default App;
