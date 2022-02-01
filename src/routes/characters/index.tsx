import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UploadIcon from '@mui/icons-material/Upload';
import { Container, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Dropdown } from 'components/dropdown';
import { AppContext } from 'hooks/appcontext';
import { useLocalStorage } from 'hooks/use-localstorage';
import { get, noop, omit } from 'lodash';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { downloadFile, readFileContent } from 'utils/files';
import { v4 as uuidv4 } from 'uuid';

export default function Characters() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const appContext = React.useContext(AppContext);
  const { searchText, setEnableSearch, setContextActions } = appContext;
  const [characters, setCharacters] = useLocalStorage("characters", {});
  const fileDialog = React.useRef<any>(null);
  const uploadChange = (event: any) => {
    uploadCharacter(event);
  };
  const uploadCharacter = (event: any) => {
    event.preventDefault();
    const file = get(event, "target.files[0]");
    if (file) {
      readFileContent(file)
        .then((content) => {
          const character = JSON.parse(content);
          const uuid = uuidv4();
          setCharacters({
            ...characters,
            [uuid]: character
          });
          enqueueSnackbar(`${character.name} successfully imported.`, {
            variant: 'success',
          });
        })
        .catch((error) => {
          enqueueSnackbar(`Character failed to import.`, {
            variant: 'error',
          });
        });
    }
    if (fileDialog && fileDialog.current) {
      fileDialog.current.value = null;
    }
  };
  const downloadCharacter = (id: string) => {
    downloadFile(
      JSON.stringify(
        {
          ...get(characters, `[${id}]`),
        },
        null,
        2
      ),
      "data:text/json",
      `${get(characters, `[${id}].name`, id)}.json`
    );
  };
  const deleteCharacter = (id: string) => {
    const charactersWithDelete = omit(characters, [ id ]);
    setCharacters(charactersWithDelete);
  };
  const createNewCharacter = React.useCallback(() => {
    const uuid = uuidv4();
    navigate(`/character/${uuid}`);
  }, [ navigate ]);
  React.useEffect(() => {
    const contextActions = [
      {
        name: 'Create',
        icon: <AddIcon />,
        onClick: () => {
          createNewCharacter();
        }
      },
      {
        name: 'Upload',
        icon: <UploadIcon />,
        onClick: () => {
          if (fileDialog && fileDialog.current) {
            fileDialog.current.click();
          }
        }
      }
    ];
    setContextActions(contextActions);
    setEnableSearch(true);
    return () => {
      setContextActions([]);
      setEnableSearch(false);
    }
  }, [ setEnableSearch, createNewCharacter, setContextActions ]);
  const charactersMapped = Object.keys(characters).map((characterId: string) => {
    const theItem = characters[characterId];
    return {
      ...theItem,
      id: characterId
    }
  });
  const boonList: Array<any> = charactersMapped.filter((boon) => boon?.name?.toLocaleLowerCase()?.includes(searchText?.toLocaleLowerCase()));
  return (
    <Container>
      <Typography align="center" variant="h4" sx={{ my: 2 }}>
        Character List
      </Typography>
      <Card
        sx={{
          mb: 1,
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.getContrastText(theme.palette.secondary.main)
        }}
      >
        <ListItemButton sx={{ py: 1 }} onClick={() => createNewCharacter()}>
          <ListItemText
            primary={
              <Typography fontWeight="bold">
                Create New Character
              </Typography>
            }
          />
        </ListItemButton>
      </Card>
      {boonList.map((boon: any, index: number) => (
        <Card key={index} sx={{ mb: 1 }}>
          <ListItem
            sx={{ p: 0 }}
            secondaryAction={
              <Dropdown>
                {({ handleClose, open, handleOpen, anchorElement }: any) => (
                  <>
                    <IconButton sx={{ mr: -1 }} onClick={handleOpen}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      anchorEl={anchorElement}
                      id="basic-menu"
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        dense: true,
                        onClick: handleClose,
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={() => { navigate(`/character/${boon.id}`) }}>
                        <ListItemIcon>
                          <EditIcon />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => downloadCharacter(boon.id)}>
                        <ListItemIcon>
                          <DownloadIcon />
                        </ListItemIcon>
                        <ListItemText>Download</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => deleteCharacter(boon.id)}>
                        <ListItemIcon>
                          <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </Dropdown>
            }
          >
            <ListItemButton sx={{ py: 0 }} onClick={noop}>
              <ListItemText
                primary={boon.name}
                secondary={boon.description}
              />
            </ListItemButton>
          </ListItem>
        </Card>
      ))}
      <input
        id="file-Form.Control"
        type="file"
        name="name"
        multiple
        ref={fileDialog}
        onChange={uploadChange}
        style={{ height: "0px", overflow: "hidden" }}
      />
    </Container>
  );
}