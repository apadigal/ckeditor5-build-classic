import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';

export default class SvgConverterAdapterPlugin extends Plugin {
    static get requires() {
        return [ FileRepository ];
    }

    init() {
        const editor = this.editor;

        editor.plugins.get('FileRepository').createUploadAdapter = loader => {
            return new SvgConverterAdapter(loader);
        };
    }
}

class SvgConverterAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    async upload() {
        const file = await this.loader.file;
        const base64 = await fileToBase64(file);

        // Wrap raster image into <svg><image>
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="${file.width || 300}" height="${file.height || 200}">
                <image href="${base64}" width="100%" height="100%" />
            </svg>
        `;

        // CKEditor expects { default: <url> }
        return { default: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}` };
    }

    abort() {}
}

// Utility to convert file → base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
