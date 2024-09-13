import React, { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types'; // Import PropTypes

const CollapsibleMenu = ({ isCollapsed: isCollapsedInitialValue = true, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(isCollapsedInitialValue);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsCollapsed(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsCollapsed(true);
        }
    };

    useEffect(() => {
        setIsCollapsed(isCollapsedInitialValue);
    }, [isCollapsedInitialValue]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={menuRef}
            style={isCollapsed ? styles.collapsedMenu : styles.expandedMenu}
        >
            <button style={styles.toggleButton} onClick={toggleMenu}>
                {isCollapsed ? '>>' : '<<'}
            </button>
            {!isCollapsed && (
                <div style={styles.menuContent}>
                    {children}
                </div>
            )}
        </div>
    );
};

// CollapsibleMenu.propTypes = {
//     isCollapsed: PropTypes.bool,
//     children: PropTypes.node.isRequired,
// };

const styles = {
    collapsedMenu: {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '20px',
        height: '100vh',
        backgroundColor: '#333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'width 0.3s',
        zIndex: 1000,
    },
    expandedMenu: {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '200px',
        height: '100vh',
        backgroundColor: '#333',
        color: '#fff',
        transition: 'width 0.3s',
        zIndex: 1000,
    },
    toggleButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#fff',
        fontSize: '10px',
        cursor: 'pointer',
        outline: 'none',
        padding: '10px',
    },
    menuContent: {
        padding: '10px',
    },
};

export default CollapsibleMenu;
