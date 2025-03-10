import AboutUI from '@component/AboutUI/AboutUI';
import ProjectUI from '@component/ProjectUI/ProjectUI';
import SkillUI from '@component/SkillUI/SkillUI';
import ContactUI from '@component/ContactUI/ContactUI';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';

const App = () => {
    const { theme } = useContext(AppContext);

    return (
        <div className="text-web-500 dark:text-web-100">
            <AboutUI />
            <ProjectUI />
            <SkillUI />
            <ContactUI />
            <ToastContainer theme={theme} />
        </div>
    );
};

export default App;
