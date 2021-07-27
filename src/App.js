import { Container, Dialog } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { DialogContent } from './DialogContent';
import { getLocalStorage, setLocalStorage } from './utils';
// 2 seconds
const TIMEOUT = 2000;
const COMPLETED_KEY = 'completed';

const useDialog = () => {
    const [isActive, setIsActive] = useState(false);

    // triggers onload
    useEffect(() => {
        setTimeout(() => {
            const isCompleted = getLocalStorage({ label: COMPLETED_KEY });

            setIsActive(!isCompleted);
        }, TIMEOUT);
    });

    const onCompleteSurvey = () => {
        setLocalStorage({ label: COMPLETED_KEY, value: true });
        setIsActive(false);
    };

    return {
        isActive,
        onCompleteSurvey,
    };
};

export default function App() {
    const { isActive, onCompleteSurvey } = useDialog();

    return (
        <Dialog open={isActive} fullScreen>
            <Container>
                <DialogContent onCompleteSurvey={onCompleteSurvey} />
            </Container>
        </Dialog>
    );
}
