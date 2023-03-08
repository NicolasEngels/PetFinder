import logo from "../Assets/chat-logo.png"

function HomePage() {
    return (
        <div id="home">
            <div id="top">
                <button className="button find"><a href="/find">FIND</a></button>

                <img src={logo} alt="logo" id="logo"></img>

                <button className="button lost"><a href="/lost">LOST</a></button>
            </div>

            <main>
                <div id="search">
                    <input type="text" id="location"/>

                    <select name="sort" id="sort">
                        <option value="">sort by</option>
                        <option value="distance">distance</option>
                        <option value="recent">recent</option>
                    </select>
                </div>

                <div id="map">

                </div>

                <div id="posts">

                </div>
            </main>
        </div>
    )
}

export default HomePage;
