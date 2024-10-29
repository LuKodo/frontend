import React, {Fragment} from 'react';
import '../../shared/css/theme.min.css'
import {NavBar} from "./NavBar.tsx";

const LayoutStore = ({children}: { children: React.ReactNode }) => {
    return (
        <Fragment>
            <NavBar/>

            <main>
                {children}
            </main>


            <div className="footer-bottom m-t-40">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="gi-copy">Copyright © Inversiones La Central de Clemencia<br/>
                                all rights reserved. Powered by <a className="site-name"
                                                                   href="https://me.luiscaraballo.com.co">Ing. Luis
                                    Caraballo </a>.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default LayoutStore