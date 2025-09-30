import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class SvgWidgetPlugin extends Plugin {
    init() {
        const editor = this.editor;

        // Schema
        editor.model.schema.register('svgWidget', {
            isObject: true,
            allowWhere: '$block',
            allowAttributes: ['htmlContent']
        });

        // Upcast <svg> → model element
        editor.conversion.for('upcast').elementToElement({
            view: 'svg',
            model: (viewElement, { writer }) =>
                writer.createElement('svgWidget', {
                    htmlContent: viewElement.getOuterHtml()
                })
        });

        // Downcast for editing (widget in editor UI)
        editor.conversion.for('editingDowncast').elementToElement({
            model: 'svgWidget',
            view: (modelElement, { writer }) => {
                const svgHtml = modelElement.getAttribute('htmlContent') || '';
                const container = writer.createRawElement(
                    'div',
                    { class: 'svg-widget' },
                    domElement => {
                        domElement.innerHTML = svgHtml;
                    }
                );
                return toWidget(container, writer, { label: 'SVG widget' });
            }
        });

        // Downcast for data (HTML output)
        editor.conversion.for('dataDowncast').elementToElement({
            model: 'svgWidget',
            view: (modelElement, { writer }) => {
                const svgHtml = modelElement.getAttribute('htmlContent') || '';
                return writer.createRawElement('div', {}, domElement => {
                    domElement.innerHTML = svgHtml;
                });
            }
        });

        // Enable resizing handles
        editor.plugins.get('WidgetResize').attachTo({
            editor,
            modelElement: 'svgWidget',
            viewElement: editor.editing.view.document.getRoot(),
            handleHost: editor.editing.view.document.getRoot(),
            resizeHost: editor.editing.view.document.getRoot()
        });
    }
}
