start = allGlobalTypes*

allGlobalTypes = linkLiteral / comment / elem / invocation / variable / text

any = .
ws 'whitespace' = [\n\r\t ]
comma = ','
number = val:(([0-9]* '.' [0-9]+) / [0-9]+) {
	return {
        type: 'number',
    	value: Number(val),
    };
}

doubleQuote = '"'
singleQuote = "'"

string = doubleQuote text:$doubleQuoteCharacter* doubleQuote {
	return {
    	type: 'string',
        subtype: 'single',
        value: text,
	};
} / singleQuote text:$singleQuoteCharacter* singleQuote {
	return {
    	type: 'string',
        subtype: 'double',
        value: text,
	};
}

bareString
	= text:$invokeNameChar+ {
    	return {
        	type: 'string',
            subtype: 'bare',
            value: text,
        }
    }

doubleQuoteCharacter = !doubleQuote c:strChar {
	return c;
}

singleQuoteCharacter = !singleQuote c:strChar {
	return c;
}

strChar 'character' = escapeSequence / unescaped
escapeSequence = escapeCharacter sequence:(
     doubleQuote /
     singleQuote /
     "\\" /
     "/" /
     "b" { return '\b'; } /
     "f" { return '\f'; } /
     "n" { return '\n'; } /
     "r" { return '\r'; } /
     "t" { return '\t'; } /
     "u" digits:$(HEXDIG HEXDIG HEXDIG HEXDIG) {
       return String.fromCharCode(parseInt(digits, 16));
     }) {
		return sequence;
	}

unescaped = [\x20-\x21\x23-\x5B\x5D-\u10FFFF]
escapeCharacter = "\\"
HEXDIG = [0-9a-f]i

invokeNameChar = [^\n\r\t <>/$,=|]

linkLiteral
	= linkOpen
    linkContents:(twoPartLinkContents / onePartLinkContents)
    linkClose {
	return linkContents;
}

twoPartLinkContents
	= linkTextContents:linkTextItem+
    ender:linkTextEnder
    passageName:$passageNameChar+ {
		if (!passageName) {
			throw new Error('There was no passage name.');
		}

		let subtype;
		if (ender === '->') {
			subtype = 'rightArrow';
		} else if (ender === '|') {
			subtype = 'bar';
		} else {
			subtype = 'passageNameOnly';
		}

		return {
			type: 'link',
			subtype,
			passageName,
			children: linkTextContents,
        };
	}
    
onePartLinkContents = passageName:$passageNameChar+ {
	return {
    	type: 'link',
        subtype: 'onePart',
        passageName,
        children: [],
    };
}

linkChar = [^\]]
linkOpen = '[['
linkClose = ']]'
    
linkTextItem
	= comment /
    elem /
    variable /
    invocation /
    text:$(!linkTextEnder any)+

linkTextEnder = '->' / '|' / ']' / '<' elemKeyChar
passageNameChar = [^\]]

comment = commentOpen $value:(!'-->' val:any { return val; })* commentClose {
	return {
		type: 'comment',
        value,
	};
}

commentOpen = '<!--'
commentClose = '-->'

elem = elem:(script / style / doubleTagElement / singleTagElement) {
	if (elem.tagName === 'tw-link') {
    	let passageName = '___ERROR_NO_PASSAGE-NAME_ATTRIBUTE';
    	elem.type = 'link';
        elem.subtype = 'linkElement';
        for (let ii = 0; ii < elem.attributes.length; ii += 1) {
        	const attr = elem.attributes[ii];
        	if (attr.key === 'passage-name') {
            	passageName = attr.value;
            	break;
            }
        }
        
        elem.passageName = passageName;
    }
    
    return elem;
}
   
script
	= '<script' attrs:scriptOrStyleAttrs '>' 
    contents:(!"</script>" any)*
    '</script' ws* elemCloseChar {
    	return {
    		type: 'element',
        	tagName: 'script',
        	attributes: attrs,
        	children: [
        		contents,
        	],
		};
    }

style
	= '<style' attrs:scriptOrStyleAttrs '>' 
    contents:$(!"</style>" any)*
    '</style' ws* elemCloseChar {
    	return {
    		type: 'element',
        	tagName: 'style',
        	attributes: attrs,
        	children: [
        		contents,
        	],
		};
    }

scriptOrStyleAttrs
	= attrs:(ws+ attrs:elemAttr* { return attrs; })* {
    	return attrs;
    }

singleTagElement 'voidElement'
	= elemOpenChar tagName:elemTag ws* attrs:elemAttr* '/'? ws* elemCloseChar {
    	return {
			type: 'element',
			tagName,
			attributes: attrs,
            children: [],
        };
    }

doubleTagElement 'elementWithTwoTags'
	/* <span></span> 
     *     <            span               foo="bar"          >                 whatever         </span>   
     */
	= elemOpenChar tagName:elemTag ws* attrs:elemAttr* ws* elemCloseChar children:elemContents elemClose {
    	return {
			type: 'element',
			tagName: tagName,
			attributes: attrs,
            children,
        };
    }

elemOpenChar 'elementOpeningCharacter' = '<'
elemCloseChar 'elementClosingCharacter' = '>'
elemKey 'elementTagNameOrAttributeKey' = $elemKeyChar+
elemKeyChar 'Element key character' = (!'>' [a-zA-Z\-]+)
elemTag 'elementTagName' = elemKey
elemAttr 'elementAttribute'
	= key:elemAttrKey
	attrValue:('=' value:elemAttrValue ws* { return value; })? ws* {
		return {
			type: 'elementAttribute',
			key,
			value: (attrValue || {}).value || '',
		};
	}

elemAttrKey 'elementAttributeKey' = $elemKey
elemAttrValue 'elementAttributeValue' = string
elemOpen = elemOpenChar elemTag ws* elemAttr* elemCloseChar
elemContents = allGlobalTypes*
elemClose = elemOpenChar '/' elemTag ws* elemCloseChar

invokeOpen 'invocationOpen' = '<<'
invokeClose 'invocationClose' = '>>'

invokeName = $invokeNameChar+

variableOpen 'variableOpener' = "$"
variable = variableOpen varName:$invokeNameChar+ {
	return {
    	type: 'variable',
        name: varName,
    };
}

arg "argument"
	= arg:(invocation / string / number / variable / bareString) (ws* comma ws* / ws+)?  {
    	if (arg.type === 'invocation') {
        	return arg;
        }

    	const argument = {
	    	type: arg.type,
    		value: arg.value,
	    };
        
        if ('subtype' in arg) {
        	argument.subtype = arg.subtype;
        }

        return arg;
    }

invocation = withBodyInvocation / withoutBodyInvocation

withoutBodyInvocation
	= invokeOpen invokeName:invokeName ws* args:arg* invokeClose {
    	return {
            type: 'invocation',
            subtype: 'withoutBody',
            name: invokeName,
        	arguments: args,
            children: [],
        };
    }

withBodyInvocation
	/* <<foo bar "baz", 'bux' 2>>whatever<</foo>>
     * <<foo bar "baz", 'bux' 2>>     whatever      <<        / | end      foo      >>
     */
	= invoke:withoutBodyInvocation children:allGlobalTypes* invokeOpen ('/' / 'end') invokeName invokeClose {
		return {
			type: 'invocation',
			subtype: 'withBody',
			functionName: invoke.name,
			arguments: invoke.arguments,
			children,
		};
	}

text = characters:$(!(invokeOpen / linkOpen / elemOpenChar ('/' / elemKeyChar) / variableOpen) any)+ {
	return characters;
}