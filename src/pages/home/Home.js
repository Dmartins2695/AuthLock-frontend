import classes from './Home.module.sass'
import {Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShieldIcon from '@mui/icons-material/Shield';

export const Home = () => {

    const DisplayersSection = () => {
        return (
            <div className={classes.headerColumnDisPlayerWrapper}>
                <div className={classes.headerRowInnerWrapper}>
                    <div className={classes.headerColumnInnerWrapper}>
                        <div className={classes.headerRoundDisPlayer}>
                            <Typography>0</Typography>
                        </div>
                        <div>
                            <Typography className={classes.disPlayersText}>Total</Typography>
                        </div>
                    </div>
                    <div className={classes.headerColumnInnerWrapper}>
                        <div className={classes.headerRoundDisPlayer}>
                            <Typography>0</Typography>
                        </div>
                        <div>
                            <Typography className={classes.disPlayersText}>Outdated</Typography>
                        </div>
                    </div>
                    <div className={classes.headerColumnInnerWrapper}>
                        <div className={classes.headerRoundDisPlayer}>
                            <Typography>0</Typography>
                        </div>
                        <div>
                            <Typography className={classes.disPlayersText}>Duplicated</Typography>
                        </div>
                    </div>
                    <div className={classes.headerColumnInnerWrapper}>
                        <div className={classes.headerRoundDisPlayer}>
                            <Typography>0</Typography>
                        </div>
                        <div>
                            <Typography className={classes.disPlayersText}>Weak</Typography>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const Header = () => {
        return (
            <div className={classes.headerArea}>
                <div className={classes.headerRowWrapper}>
                    <div className={classes.headerColumnLogoWrapper}>
                        <div className={classes.headerRowInnerWrapper}>
                            <img className={classes.headerLogo} src={require('../../assets/images/img.png')}
                                 alt='logo'/>
                        </div>
                    </div>
                    <DisplayersSection/>
                </div>
            </div>
        )
    }

    const Body = () => {
        return (
            <div className={classes.bodyDataArea}>
                <div className={classes.bodyDataTable}>
                    <hr/>
                    <div className={classes.bodyDataItem}>
                        <div className={classes.bodyDataItemFavorite}>
                            <StarOutlineIcon/>
                        </div>
                        <div className={classes.bodyDataItemWebsite}>
                            <Typography>www.facebook.com</Typography>
                        </div>
                        <div className={classes.bodyDataItePassword}>
                            <Typography>**********</Typography>
                            <VisibilityOffIcon/>
                        </div>
                        <div className={classes.bodyDataItemCreatedAt}>
                            <Typography>1 day ago</Typography>
                        </div>
                        <div className={classes.bodyDataItemWeak}>
                            <ShieldIcon style={{color: 'red'}}/>
                        </div>
                    </div>
                    <hr/>
                    <div className={classes.bodyDataItem}>
                        <div className={classes.bodyDataItemFavorite}>
                            <StarIcon/>
                        </div>
                        <div className={classes.bodyDataItemWebsite}>
                            <Typography>www.facebook.com</Typography>
                        </div>
                        <div className={classes.bodyDataItePassword}>
                            <Typography>**********</Typography>
                            <VisibilityIcon/>
                        </div>
                        <div className={classes.bodyDataItemCreatedAt}>
                            <Typography>1 day ago</Typography>
                        </div>
                        <div className={classes.bodyDataItemWeak}>
                            <ShieldIcon style={{color: 'red'}}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.body}>
            <div className={classes.container}>
                <Header/>
                <div className={classes.bodyArea}>
                    <div className={classes.bodyAreaButtonsRowWrapper}>
                        <div className={classes.bodyAreaButtonsColumnWrapper}>
                            <div className={classes.addPasswordButton}>
                                <AddIcon/>
                                <Typography>Add new Password</Typography>
                            </div>
                        </div>
                    </div>
                    <Body/>
                </div>
            </div>
        </div>
    )
}