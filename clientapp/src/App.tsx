import AboutUI from '@component/AboutUI/AboutUI';
import ProjectUI from '@component/ProjectUI/ProjectUI';
import SkillUI from '@component/SkillUI/SkillUI';

const App = () => {
    return (
        <div className="text-web-500 dark:text-web-100">
            <AboutUI />
            <ProjectUI />
            <SkillUI />
        </div>
    );
};

export default App;
