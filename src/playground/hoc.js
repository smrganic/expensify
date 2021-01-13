
//Higher order component is a component that renders another component
//code reuse
//render highjacking
//prop manipulation
//abstract state

import React from "react"
import ReactDOM from "react-dom"

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>This info is: {props.info}.</p>
    </div>
)

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info please don't share.</p>}
            <WrappedComponent {...props} />
        </div>
    )
}

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please log in.</p>}
        </div>
    )
}

const AdminInfo = withAdminWarning(Info)
const AuthInfo = requireAuthentication(Info)

ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the details" />, document.getElementById("app"))