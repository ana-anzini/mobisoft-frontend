// import React from 'react'Binding element 'mainButtonTitle' implicitly has an 'any' type.ts(7031)

import './style.sass';
import { IMain } from './IMain';

const Main = ({
    mainButtonTitle,
    handleEdit,
    handleDelete
}: IMain) => {
    return (
        <main id="main">
            <div className='main-container'>
                {/* <TopButtons 
              mainButtonTitle={mainButtonTitle}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            /> */}
            </div>
        </main>
    )
}

export default Main 