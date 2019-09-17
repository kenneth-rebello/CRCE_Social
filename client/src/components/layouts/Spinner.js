import React, {Fragment} from 'react';
import spinner from '../../img/spinner.gif';

export default () => (
    <Fragment>
        <div className="plain-page">
            <img src ={spinner} style={{width:'350px', height:'350px', margin:'auto',display:'block'}} alt='Loading...'/>       
        </div>    
    </Fragment>
)