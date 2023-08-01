const Header = ({handleToggleDarkMode}) => {
    return (
        <div className="header">
            <h1>Notes</h1>
            {/* we pass in a function to handleToggleDarkMode that simply switches between true and false */}
            <button onClick={()=>handleToggleDarkMode((previousDarkMode) => !previousDarkMode)}className="save">Toggle dark mode</button>
        </div>
    )
}

export default Header;