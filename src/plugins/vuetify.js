import {createVuetify} from "vuetify";

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
    defaults: {
        VCard: {
            class: 'pa-4'
        },
        VBtn: {
            size: 'small'
        },
        VTextField: {
            variant: 'underlined',
            density: 'comfortable',
            color: 'light-blue-darken-4'
        },
        VSelect: {
            variant: 'underlined',
            density: 'comfortable',
            color: 'light-blue-darken-4'
        },
        VTextarea: {
            variant: 'underlined',
            density: 'comfortable',
            color: 'light-blue-darken-4'
        },
        VAppBar: {
            elevation: 4
        },
        VContainer: {
            fluid: true,
            class: 'mx-4'
        },
        VNavigationDrawer: {
            color: 'light-blue-darken-4',
            elevation: 8
        },
        VList: {
            density: 'compact',
        },
        VDataTableServer: {
            density: 'compact',
            noDataText: 'Нет данных...',
            loadingText: 'Загрузка данных...',
            itemsPerPageText: 'Записей на странице:',
            pageText: 'c {0} - {1} из {2}',
            showCurrentPage: true,
            mustSort: true,
            itemsPerPageOptions: [
                {value: 10, title: '10'},
                {value: 25, title: '25'},
                {value: 50, title: '50'},
                {value: 100, title: '100'},
            ],
        },
        VDataTable: {
            density: 'compact',
            noDataText: 'Нет данных...',
            itemsPerPageText: 'Записей на странице:',
            pageText: 'c {0} - {1} из {2}',
            showCurrentPage: true,
            itemsPerPageOptions: [
                {value: 10, title: '10'},
                {value: 25, title: '25'},
                {value: 50, title: '50'},
                {value: 100, title: '100'},
                {value: -1, title: 'Все'},
            ],
        },
    }
});

export default vuetify;