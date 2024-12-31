export const smartPreviewerDataArray = [
    {
        id: 'render_with_valid_TIS_text',
        title: 'data to render with valid TIS text',
        expectation: `
        1. [Completed]: [Passed]: [Should Parse valid TIS]: - Both SmartEditorV3 and SmartEditorV4[_unstable] should successfully parse the string and render with help of their respective SmartPreviewer(s)
            Note: 'SmartEditorV4[_unstable]' (will be referred as 'SmartEditorV4' in susequent discussion)
        2. [Planned]: [TBD]: []: - 
        `,
        data: {
            content: `

   
            Project repository  
            Expectation for next major release 1.1.0
                Business logic
                    Project to contain all project(personal/professional) details
                        details like
                            name of project
                            repository location
                            unique slug (derived from repository location)
                            tech stacks
                            purpose of project
                            all version details ( a multiline string )
                            next major release and its target  ( a multiline string )
                            current version and its target  ( a multiline string )
                            related company details
                                company name
                                other details
                    secure API 
                        by JWT token
                        Roles based access 
                            Admin can edit data
                            Reader can view data
                        Granulated authority for Reader role
                            Reader can read one or more project data as per configuration
                            
                    Users with admin or reader role can login into application
                        - for now since there is small user base, hence in-memory user details approach preferred
                        - later a centralised approach to get user details will be incorporated
                        - users with reader role can 
                            use UI to update/view their details
                            use API with valid JWT token
                        
                    Admin can 
                        create a new user details
                        view user details
                        reset password 
                            but can not edit user details, other than its role and few other fields, which should be only managed by admin
                            
                Bakend application
                    API to perform CRUD operation for projects
                    Filters to check valid JWT token to permit access
                    Filters to check roles of user (either admin/reader) before provide access to a particular rest resource
                    few public APIs which will be decided later as per user's feedback
                    
                UI application
                    a login screen
                    a sign-up request form 
                    error 404 page to show error message for unsupported resources
                    a centralised popup to show error/success/warning messages
            `,
            textOutputType: 'skeleton',
            textInputType: 'TextArea'
        }
    },
    {
        id: 'show_errors_with_invalid_TIS_text',
        title: 'data to show errors with invalid TIS text',
        expectation: `
        1. [Passed]: [Should show errors for invalid TIS]: Both SmartEditorV3 and SmartEditorV4[_unstable] should successfully parse the string and render with help of their respective SmartPreviewer(s)
            Note: 'SmartEditorV4[_unstable]' (will be referred as 'SmartEditorV4' in susequent discussion)
        `,
        data: {
            content: `
                    root
                child
            grandchild
                child2
                    grandchild2
        `,
            textOutputType: 'skeleton',
            textInputType: 'TextArea'
        }
    }
];

export const observations = `
################################
[Incomplete: TBD]
1. PlainText ---> SE will use TextArea, by default ---> output as PlainText and pass to SP ---> SP will render it with '<p>' element
2. PlainText

###################################

[Functionalities: FUNCNLTY] / [limitations: LIMTNS] / [Potential Bugs: PB] - In SmartEditorV3
    - [FUNCNLTY]: 'SmartEditorV3' can parse valid TIS and show errors for invalid TIS
    - [LIMTNS]: 'SmartEditorV3' is not reflecting changed value of data, being recalculated on 'Next' button click
        - Verifying this limitation with normal textarea component, if it can reflect changes
        - verified with normal text area, it is reflecting changed value of data
[Possible Improvements: PI]: In SmartEditorV4
    - [Marked-Sev5]: [PI]: [To be done later]:- SmartEditorV4 should reflect changed value of data
        - [Workaround]: Mostly we close the form once save/edit/upsert operation get completed. 
            Hence this PI is marked as 'Sev5' (lowest) sevierity.
            Can work on this issue later. Currently focusing on rendering TIS to JSON and finally to Skeleton
    - [Planned]: prop 'renderNode' for SmartEditor as well as SmartPreviewer, to render tree data
    - [Planned]: Add option for 'YAML to Skeleton' inside 'SmartEditorV4'
        -[Planned]: Add also logic to first parse yaml, then, pass this data to TreeViewer
        -[Planned]: Add temporary button to copy tree data as yaml text

`