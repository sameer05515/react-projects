import React, { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types'; // Import PropTypes

interface CollapsibleMenuProps {
    isCollapsed?: boolean;
    children?: React.ReactNode;
}

const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({ isCollapsed: isCollapsedInitialValue = true, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(isCollapsedInitialValue);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsCollapsed(prevState => !prevState);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && event.target && !menuRef.current.contains(event.target as Node)) {
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
            className={`fixed left-0 top-0 h-screen bg-gray-800 z-[1000] transition-all duration-300
                ${isCollapsed ? "w-5 flex items-center justify-center" : "w-52 text-white"}`}
        >
            <button
                className={`
                    bg-transparent border-none text-white text-xs cursor-pointer outline-none p-2
                    focus:outline-none
                `}
                onClick={toggleMenu}
                tabIndex={0}
                aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
            >
                {isCollapsed ? '>>' : '<<'}
            </button>
            {!isCollapsed && (
                <div className="p-2">
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

export default CollapsibleMenu;
