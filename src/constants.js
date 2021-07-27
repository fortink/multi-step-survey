import { MultiCheckbox, RadioButtons, Select, TextInput } from './Inputs';

export const ACTIVE_STEP_KEY = 'activeStep';

// array from 1 to 119;
const AGE_OPTIONS = [...Array(120).keys()].slice(1);

export const LABELS = ['Name', 'Email', 'Age', 'Gender', 'Favorite Book', 'Favorite Colors'];

// Form Config
export const STEPS = [
    {
        title: 'Identity',
        questions: [
            {
                label: LABELS[0],
                required: false,
                Component: TextInput,
                initialValue: '',
            },
            {
                label: LABELS[1],
                required: false,
                Component: TextInput,
                initialValue: '',
            },
        ],
    },
    {
        title: 'Details',
        questions: [
            {
                label: LABELS[2],
                required: true,
                Component: Select,
                options: AGE_OPTIONS,
                initialValue: '',
            },
            {
                label: LABELS[3],
                required: true,
                Component: RadioButtons,
                options: ['Male', 'Female', 'Prefer not to say'],
                initialValue: null,
            },
        ],
    },
    {
        title: 'Favorites',
        questions: [
            {
                label: LABELS[4],
                required: true,
                Component: TextInput,
                initialValue: '',
            },
            {
                label: LABELS[5],
                required: true,
                Component: MultiCheckbox,
                options: ['Red', 'Blue', 'Green', 'Pink', 'Other'],
                initialValue: [],
            },
        ],
    },
    {
        title: 'Review',
    },
];
