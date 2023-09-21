// The custom category with a image display
class MangoCategory extends Blockly.ToolboxCategory {
    
    constructor(categoryDef, toolbox, opt_parent) {
        super(categoryDef, toolbox, opt_parent);
        
    }
    
    // @override
    createIconDom_() {        
        const img = document.createElement('img');
        img.src = './images/toolbox/icon-text.png';
        img.alt = 'Lamp';
        img.width='25';
        img.height='25';
        return img;
    }
};

// 2.Blockly register
Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.ToolboxCategory.registrationName,
    MangoCategory, true);

