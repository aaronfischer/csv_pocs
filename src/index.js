import papaparse from 'papaparse';


class ObjectBody {
  constructor() {
    this.seriesIds = [];
  }

  get body() {
    return this.seriesIds
  }
}

class FileHandler {
  static attach(node) {
    console.log('attach node', node);
    (new FileHandler(node)).bind();
  }

  constructor(node) {
    this.node = node;
  }

  bind() {
    this.node.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) this.loadFile(file);
    });
  }

  loadFile(file) {
    const responseObject = new ObjectBody();
    papaparse.parse(file, {
      worker: true,
      step(row) {
        responseObject.seriesIds.push({
          id: row.data[0],
          type: 'series_ids'
        });
      },
      complete(results) {
        console.log('All Done!', responseObject);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  FileHandler.attach(document.getElementById('csv_upload'));
});