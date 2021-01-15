import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen.js'
import NewTodo from './screens/NewTodo.js';
import './App.css';

const App = () => {
    return (
        <Router>
            <Header />
            <main className={'py-3'}>
                <Container>
                    <Route exact path={'/'} component={HomeScreen} />
                    <Route exact path={'/newTodo'} component={NewTodo} />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
