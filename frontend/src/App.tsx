import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from "./styles/NotesPage.module.css";
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import * as NotesApi from "./network/notes_api";
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';
import NotesPageLoggedInView from './components/NotesPageLoggedInView';

function App() {

  const [loggedInUser, setLoggedInUser] = useState<User|null>(null)

  const [showSignupModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser()
        setLoggedInUser(user)
      } catch (error) {
        console.error(error)
      }
    }
    fetchLoggedInUser()
  }, [])

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
    <Container className={styles.notesPage}>
      <>
        {loggedInUser
          ? <NotesPageLoggedInView />
          : <NotesPageLoggedOutView />
        }
      </>
      { showSignupModal &&
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      }
      { showLoginModal &&
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      }
    </Container>
    </div>
  );
}

export default App;
