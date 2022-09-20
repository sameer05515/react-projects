import './ResumeHeader.css';

const ResumeHeader = (props) => {

    // const name= "Premendra Kumar";
    // const emailId = "premendra.bce05515@gmail.com";
    // const mobileNo = ['8010645644','8750084770'];

    return (
        <div className="float-container">

            <div className="float-child">
                <div className="green">{props.resumeHeader.name}</div>
                <div className="green">{props.resumeHeader.mobileNo[0]} , {props.resumeHeader.mobileNo[1]}</div>
                <div className="green">{props.resumeHeader.emailId}</div>
            </div>

            <div className="float-child">
                <h2>{props.resumeHeader.name}</h2>
            </div>

            <div className="float-child">
                {
                    props.resumeHeader.address.map(addr=>{
                        return <div className="blue">{addr}</div>;
                    })
                }
            </div>

        </div>
    )
}

export default ResumeHeader;