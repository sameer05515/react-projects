import { useGlobalStyles } from '@/common/hooks/useGlobalStyles';
import { MdPostAdd, MdMessage } from 'react-icons/md';
// import classes from './MainHeader.module.css';


type MainHeaderProps={
    onCreatePost: ()=> void;
}


function MainHeader({ onCreatePost }:MainHeaderProps) {
    const {GLOBAL_APPLICATION_STYLES:{"main-header":header,"main-header-logo":logo,"main-header-button":button }}= useGlobalStyles();
  return (
    <header className={header}>
      <h1 className={logo}>
        <MdMessage />
        React Poster
      </h1>
      <p>
        <button className={button} onClick={onCreatePost}>
          <MdPostAdd size={18} />
          New Post
        </button>
      </p>
    </header>
  );
}

export default MainHeader;