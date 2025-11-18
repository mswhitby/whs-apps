function doGet(e) {
    const service = e.parameter.service;
    
    if (page === 'admin') {
    return HtmlService.createTemplateFromFile('admin')
      .evaluate()
      .setTitle('Sample App - Dashboard')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    } else {
      // Default to public page
      return HtmlService.createTemplateFromFile('public')
        .evaluate()
        .setTitle('Sample App')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    }
}