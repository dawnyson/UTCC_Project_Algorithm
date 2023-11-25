class DictionaryNode {
    constructor(vocabulary, category, translation) {
        this.vocabulary = vocabulary;
        this.category = category;
        this.translation = translation;
        this.next = null;
        this.prev = null;
    }
}

class Dictionary {
    constructor() {
        this.head = null;
        this.tail = null;
        this.current = null;
    }

    getAll() {
        let currentNode = this.head;
        const allEntries = [];
    
        if (!this.head) {
            return allEntries;
        }
    
        do {
            allEntries.push({
                vocabulary: currentNode.vocabulary,
                category: currentNode.category,
                translation: currentNode.translation
            });
            currentNode = currentNode.next;
        } while (currentNode !== this.head);
    
        return allEntries;
    }
    
    add(vocabulary, category, translation) {
        const newNode = new DictionaryNode(vocabulary, category, translation);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.head.next = this.head; // สร้างการเชื่อมโยงกลับไปยังตัวเองเพื่อสร้างวงรอบ
            this.head.prev = this.head;
            this.current = newNode;
        } else {
            newNode.prev = this.tail;
            newNode.next = this.head; // เชื่อมโยงโหนดใหม่กับโหนดแรกเพื่อสร้างวงรอบ
            this.tail.next = newNode;
            this.head.prev = newNode;
            this.tail = newNode;
        }
    }

    update(vocabulary, newCategory, newTranslation) {
        let currentNode = this.head;
        if (!this.head) {
            return false;
        }

        do {
            if (currentNode.vocabulary === vocabulary) {
                currentNode.category = newCategory;
                currentNode.translation = newTranslation;
                return true; // แสดงว่าการอัปเดตสำเร็จ
            }
            currentNode = currentNode.next;
        } while (currentNode !== this.head);

        return false; // ไม่พบคำศัพท์ที่ต้องการอัปเดต
    }

    delete(vocabulary) {
        let currentNode = this.head;
        if (!this.head) {
            return false;
        }

        do {
            if (currentNode.vocabulary === vocabulary) {
                if (currentNode === this.head) {
                    this.head = this.head.next;
                    this.tail.next = this.head;
                    this.head.prev = this.tail;
                } else if (currentNode === this.tail) {
                    this.tail = this.tail.prev;
                    this.tail.next = this.head;
                    this.head.prev = this.tail;
                } else {
                    currentNode.prev.next = currentNode.next;
                    currentNode.next.prev = currentNode.prev;
                }

                if (this.current === currentNode) {
                    this.current = currentNode.next;
                }

                return true; // แสดงว่าการลบสำเร็จ
            }
            currentNode = currentNode.next;
        } while (currentNode !== this.head);

        return false; // ไม่พบคำศัพท์ที่ต้องการลบ
    }


    searchByEnglish(word) {
        if (!this.head || !word) {
            return null;
        }
        let currentNode = this.current;
        let matchingNode = null;
        const searchTerm = word.toLowerCase();
    
        do {
            if (currentNode.vocabulary.toLowerCase().includes(searchTerm)) {
                matchingNode = currentNode;
                this.current = matchingNode; // Update the current pointer to the matching node
                break; // Once a match is found, break the loop
            }
            currentNode = currentNode.next;
        } while (currentNode !== this.current);
    
        return matchingNode || null;
    }
    

    moveToNext() {
        if (this.current && this.current.next) {
            this.current = this.current.next;
        }
    }

    moveToPrevious() {
        if (this.current && this.current.prev) {
            this.current = this.current.prev;
        }
    }
}

export { Dictionary, DictionaryNode };
