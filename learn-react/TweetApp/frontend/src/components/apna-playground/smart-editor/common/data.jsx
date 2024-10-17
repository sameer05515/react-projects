export const smartPreviewerDataArray=[
    {
        id:'data_to_render_TIS_text',
        title:'data to render TIS text',
        expectation:`
        1. Both SmartEditorV3 and SmartEditorV4[_unstable] should successfully parse the string
            Note: 'SmartEditorV4[_unstable]' (will be referred as 'SmartEditorV4' in susequent discussion)
        `,
        data:{
            content:`

   
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
            textOutputType:'skeleton',
            textInputType:'TextArea'
        }
    }
]