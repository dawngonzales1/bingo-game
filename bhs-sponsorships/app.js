(function () {
  'use strict';

  var MAX_BYTES = 25 * 1024 * 1024;
  // Raster logos smaller than this (shortest side, in pixels) usually print blurry.
  var MIN_RASTER_PX = 1000;
  var RASTER_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
  var EXT_MIME = {
    png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp',
    svg: 'image/svg+xml', pdf: 'application/pdf', ai: 'application/postscript',
    eps: 'application/postscript', psd: 'image/vnd.adobe.photoshop',
    tif: 'image/tiff', tiff: 'image/tiff'
  };

  var scriptUrl = (window.SPONSOR_APP_CONFIG || {}).scriptUrl || '';

  var form = document.getElementById('sponsor-form');
  var fileInput = document.getElementById('logo');
  var dropzone = document.getElementById('dropzone');
  var dropzoneText = document.getElementById('dropzone-text');
  var fileInfo = document.getElementById('file-info');
  var preview = document.getElementById('preview');
  var fileNameEl = document.getElementById('file-name');
  var fileMetaEl = document.getElementById('file-meta');
  var qualityWarning = document.getElementById('quality-warning');
  var formError = document.getElementById('form-error');
  var submitBtn = document.getElementById('submit-btn');
  var progress = document.getElementById('progress');
  var success = document.getElementById('success');

  var currentFile = null;
  var currentDims = null;
  var previewUrl = null;

  if (!scriptUrl) document.getElementById('config-warning').hidden = false;

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }

  function extOf(name) {
    var m = /\.([a-z0-9]+)$/i.exec(name || '');
    return m ? m[1].toLowerCase() : '';
  }

  function mimeOf(file) {
    return file.type || EXT_MIME[extOf(file.name)] || 'application/octet-stream';
  }

  function formatBytes(n) {
    if (n >= 1024 * 1024) return (n / (1024 * 1024)).toFixed(1) + ' MB';
    return Math.max(1, Math.round(n / 1024)) + ' KB';
  }

  function showError(msg) {
    formError.textContent = msg;
    formError.hidden = !msg;
    if (msg) formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function readDimensions(file) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () { resolve({ w: img.naturalWidth, h: img.naturalHeight }); };
      img.onerror = function () { resolve(null); };
      img.src = previewUrl;
    });
  }

  function clearFile() {
    currentFile = null;
    currentDims = null;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = null;
    fileInfo.hidden = true;
    preview.hidden = true;
    qualityWarning.hidden = true;
    dropzoneText.textContent = 'Tap to choose a file, or drag it here';
  }

  function handleFile(file) {
    clearFile();
    showError('');
    if (!file) return;

    if (file.size > MAX_BYTES) {
      fileInput.value = '';
      showError('That file is ' + formatBytes(file.size) + '. The limit is 25 MB — please email very large files instead.');
      return;
    }

    currentFile = file;
    var mime = mimeOf(file);
    dropzoneText.textContent = 'Tap to choose a different file';
    fileNameEl.textContent = file.name;
    fileMetaEl.textContent = formatBytes(file.size);
    fileInfo.hidden = false;
    dropzone.classList.remove('invalid');

    var browserCanShow = mime.indexOf('image/') === 0 && mime !== 'image/tiff' && mime !== 'image/vnd.adobe.photoshop';
    if (!browserCanShow) {
      fileMetaEl.textContent += ' · ' + (extOf(file.name).toUpperCase() || 'File') + ' (great for printing)';
      return;
    }

    previewUrl = URL.createObjectURL(file);
    preview.src = previewUrl;
    preview.hidden = false;

    if (RASTER_TYPES.indexOf(mime) === -1) return; // SVG is vector: always sharp

    readDimensions(file).then(function (dims) {
      if (currentFile !== file || !dims) return;
      currentDims = dims;
      fileMetaEl.textContent = formatBytes(file.size) + ' · ' + dims.w + ' × ' + dims.h + ' px';
      if (Math.min(dims.w, dims.h) < MIN_RASTER_PX) {
        qualityWarning.innerHTML = '';
        var strong = document.createElement('strong');
        strong.textContent = 'This logo may be too small to print clearly';
        qualityWarning.appendChild(strong);
        qualityWarning.appendChild(document.createTextNode(
          ' (' + dims.w + ' × ' + dims.h + ' px). If you have a larger version, a vector file (PDF, SVG, AI, EPS), ' +
          'or the original from your designer, please upload that instead. You can still submit this one.'));
        qualityWarning.hidden = false;
      }
    });
  }

  fileInput.addEventListener('change', function () {
    handleFile(fileInput.files && fileInput.files[0]);
  });

  ['dragenter', 'dragover'].forEach(function (evt) {
    dropzone.addEventListener(evt, function (e) { e.preventDefault(); dropzone.classList.add('dragover'); });
  });
  ['dragleave', 'drop'].forEach(function (evt) {
    dropzone.addEventListener(evt, function () { dropzone.classList.remove('dragover'); });
  });
  dropzone.addEventListener('drop', function (e) {
    e.preventDefault();
    var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  function readAsBase64(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        var result = String(reader.result);
        resolve(result.slice(result.indexOf(',') + 1));
      };
      reader.onerror = function () { reject(reader.error); };
      reader.readAsDataURL(file);
    });
  }

  function validate() {
    var ok = true;
    ['businessName', 'contactName', 'contactPhone'].forEach(function (id) {
      var el = document.getElementById(id);
      var empty = !el.value.trim();
      el.classList.toggle('invalid', empty);
      if (empty) ok = false;
    });
    var phone = document.getElementById('contactPhone');
    var digits = phone.value.replace(/\D/g, '');
    if (phone.value.trim() && digits.length < 10) {
      phone.classList.add('invalid');
      showError('Please enter a full phone number, including area code.');
      return false;
    }
    if (!currentFile) {
      dropzone.classList.add('invalid');
      ok = false;
    }
    if (!ok) showError('Please fill in all required fields and upload your logo.');
    return ok;
  }

  form.addEventListener('input', function (e) {
    if (e.target.classList) e.target.classList.remove('invalid');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    showError('');
    if (!validate()) return;
    if (!scriptUrl) {
      showError('This form is not connected yet. Please contact the BHS Baseball organizer.');
      return;
    }

    submitBtn.disabled = true;
    progress.hidden = false;

    readAsBase64(currentFile).then(function (base64) {
      var payload = {
        businessName: document.getElementById('businessName').value.trim(),
        contactName: document.getElementById('contactName').value.trim(),
        contactPhone: document.getElementById('contactPhone').value.trim(),
        notes: document.getElementById('notes').value.trim(),
        fileName: currentFile.name,
        mimeType: mimeOf(currentFile),
        fileSize: currentFile.size,
        width: currentDims ? currentDims.w : '',
        height: currentDims ? currentDims.h : '',
        fileData: base64
      };
      // text/plain avoids a CORS preflight, which Apps Script web apps don't answer.
      return fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (!data || !data.ok) throw new Error((data && data.error) || 'Upload failed');
      document.getElementById('success-contact').textContent = document.getElementById('contactName').value.trim();
      form.hidden = true;
      success.hidden = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }).catch(function (err) {
      showError('Sorry, something went wrong while sending your information (' + err.message +
        '). Please check your connection and try again.');
    }).then(function () {
      submitBtn.disabled = false;
      progress.hidden = true;
    });
  });

  document.getElementById('another-btn').addEventListener('click', function () {
    form.reset();
    clearFile();
    success.hidden = true;
    form.hidden = false;
  });
})();
