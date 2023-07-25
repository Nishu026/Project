import { Stack } from '@mui/system';
import { Divider, Paper, StepContent, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const drawerWidth = (window.innerWidth>600)?200:window.innerWidth;

export default function Sidepanel(){
    return(
        <Drawer 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor:'#262262',
            elevation:5
          },
        }}
        variant={(window.innerWidth<600)?"temporary":"permanent"}
        // open={mobileOpen}
        anchor="left"
      >
              <Stack spacing={1.5}  alignItems={'center'}   margin={3}>
                       
                        {/* <label>
                            <input  type="file"  hidden onChange={(e) => {getUrl(e.target.files[0])}}/>
                            <img src={user?.photoLink||Image} alt="Profile Pic" style={{borderRadius:'50%',cursor:'pointer'}}  width={100}/>        
                        </label>
                        <Typography color={'white'} textAlign={'center'} fontWeight={'bold'}>Welcome <br/>{user?.name}
                        </Typography>
                            {!edit?
                            <EasyButton label='Edit' width={3}  size='smallest'  onClick={()=>setEdit(true)}></EasyButton>
                            :<Stack justifyContent={'flex-end'} spacing={1}>
                                            <EasyButton label='Save' startIcon={<SaveIcon/>} size='small' onClick={save}></EasyButton>
                                            <EasyButton label='Cancel' startIcon={<CancelIcon/>} size='small' onClick={()=>{fetchData();setEdit(false)}}></EasyButton>

                                </Stack>}       */}
                                <Typography variant='h5' fontWeight={'bold'} color={'white'}>UDIT- UNIVERSITY OF MUMBAI, INDIA</Typography>
                                <ButtonGroup
                                    orientation="vertical"
                                    aria-label="vertical contained button group"
                                    variant="text"
                                >
                                    <Button key="one" sx={{padding:2.5,color:'white'}}  >Dashboard</Button>
                                    <Button key="four" sx={{padding:2.5,color:'white'}}  >Lectures</Button>
                                    <Button key="five" sx={{padding:2.5,color:'white'}}>Assignments</Button>
                                    <Button key="seven"  sx={{padding:2.5,color:'white'}} >Log Out</Button>
                                </ButtonGroup>                                                           
                    </Stack>
                            {/* <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
    )
}