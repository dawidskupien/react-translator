import TranslatorScreen from './features/translator/components/TranslatorScreen';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <TranslatorScreen />
      <Footer />
    </div>
  );
}

export default App;
