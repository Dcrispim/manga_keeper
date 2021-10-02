export const getLocalFile =
  (callback: (fr: FileReader, name?: string) => void) => (evt) => {
    let tgt = evt.target;
    let files = tgt.files;
    alert('c')
    // FileReader support
    if (FileReader && files && files.length) {
      let fr = new FileReader();
      alert('b')
      fr.onload = () => callback(fr, files[0]?.name);
      fr.readAsText(files[0]);
    }
  };

export function download(data: string, filename: string, type: string) {
  var file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
