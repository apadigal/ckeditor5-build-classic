import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import WidgetResize from '@ckeditor/ckeditor5-widget/src/widgetresize';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';

// Your custom plugins
import SvgWidgetPlugin from './plugins/svgwidgetplugin';
import SvgConverterAdapterPlugin from './plugins/svgconverteradapterplugin';

export default class CustomEditor extends ClassicEditorBase {}

CustomEditor.builtinPlugins = [
    Essentials,
    Bold,
    Italic,
    Paragraph,
    Widget,
    WidgetResize,
    FileRepository,
    SvgWidgetPlugin,
    SvgConverterAdapterPlugin
];

CustomEditor.defaultConfig = {
    toolbar: {
        items: [ 'bold', 'italic', '|', 'undo', 'redo' ]
    },
    language: 'en'
};
