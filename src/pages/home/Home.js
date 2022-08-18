import classes from './Home.module.sass'
import {Header} from "./components/Header";
import {Body} from "./components/Body";
import {Buttons} from "./components/Buttons";

export const Home = () => {

    return (
        <div className={classes.body}>
            <div className={classes.container}>
                <Header/>
                <div className={classes.bodyArea}>
                    <Buttons/>
                    <Body/>
                </div>
            </div>
        </div>
    )
}