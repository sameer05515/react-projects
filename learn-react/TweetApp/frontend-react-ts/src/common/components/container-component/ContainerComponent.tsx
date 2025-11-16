import React from "react";

const ContainerComponent = ({
    header /** = <p>This is the header section.</p> */,
    leftSection /**= <p>This is the left section.</p>*/,
    rightSection /**= <p>This is the right section.</p>*/,
    footer /** = <p>This is the footer section.</p> */
}) => {

    return (
        <div className="flex flex-col border border-gray-300 rounded-md p-4 w-[95%] shadow-md">
            {/* Header Section */}
            {header && (
                <div className="mb-0.5">
                    {typeof header === 'function' ? header() : header}
                </div>
            )}

            {/* Main Content Section */}
            {(leftSection || rightSection) && (
                <div className="flex justify-between">
                    {/* Left Section */}
                    <div className="flex-1 border-r border-gray-300">
                        {typeof leftSection === 'function' ? leftSection() : leftSection}
                    </div>

                    {/* Right Section */}
                    <div className="flex-[5]">
                        {typeof rightSection === 'function' ? rightSection() : rightSection}
                    </div>
                </div>
            )}

            {/* Footer Section */}
            {footer && (
                <div>
                    {typeof footer === 'function' ? footer() : footer}
                </div>
            )}
        </div>
    );
};

export default ContainerComponent;
