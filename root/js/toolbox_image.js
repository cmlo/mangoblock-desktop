class ToolboxImage extends Blockly.ToolboxItem {
    constructor(toolboxItemDef, parentToolbox) {
      super(toolboxItemDef, parentToolbox);
    }
    
    init() {        
        this.image = document.createElement('img');        
        this.image.textContent = this.toolboxItemDef_['name'];        
        this.image.src = this.toolboxItemDef_['src'];        
        const cssConfig = this.toolboxItemDef_['cssconfig'];        
        if (cssConfig) {
            this.image.classList.add(cssConfig['image']);
        }
    };
    
    getDiv() {
        return this.image;
    };
  }
  
Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
      'toolboximage',    
      ToolboxImage);

