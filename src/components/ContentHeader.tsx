export const ContentHeader = () => {
    
    //get the current date
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="content-header">
            <h2>Welcome back</h2>
            <div className="date-holder">
                <i className="bi bi-calendar"></i>
                <span>{currentDate}</span>
            </div>
        </div>
    );
}