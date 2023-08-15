import React, { Suspense, useEffect, useState } from "react";
import { observer, inject } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export type DialogInfoTypeNext = {
  name: string,
  value: string,
  title?: string
}

type StoreSceneProps = {
  getInfoDialog?: Function;
  showDialogInfo?: boolean;
  closeInfoDialog: Function;
  dialogInfo?: {
    title: string;
    text: string;
    next: DialogInfoTypeNext;
  }
}

type DialogInfoProps = {
  sceneStore?: StoreSceneProps;
}

const DialogInfo = inject('sceneStore')(observer(({ sceneStore }: DialogInfoProps) => {

  const navigate = useNavigate();

  const showDialogInfo = sceneStore?.showDialogInfo || false;

  const [dialogState, setDialogState] = React.useState(false);
  const [openPlanetList, setOpenPlanetList] = React.useState(false);

  const handleClose = () => {
    if (sceneStore?.closeInfoDialog) {
      setDialogState(false);
      sceneStore.closeInfoDialog();
    }
  }

  const handlePage = () => {
    if (sceneStore?.closeInfoDialog && sceneStore?.dialogInfo?.next?.value) {
      setDialogState(false);
      sceneStore.closeInfoDialog();
      navigate(sceneStore.dialogInfo.next.value);
    }
  }

  useEffect(() => {
    if (showDialogInfo) {
      setDialogState(!dialogState);
    }
  }, [showDialogInfo]);

  return (
    <Dialog
      open={dialogState}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {sceneStore?.dialogInfo &&
        <>
          <DialogTitle id="alert-dialog-title">
            {sceneStore.dialogInfo.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {sceneStore.dialogInfo.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            {sceneStore?.dialogInfo?.next &&
              <Button onClick={handlePage} autoFocus>
                {sceneStore.dialogInfo.next.title || 'Agree'}
              </Button>
            }
          </DialogActions>
        </>
      }
    </Dialog>
  );
}));

export default DialogInfo;
