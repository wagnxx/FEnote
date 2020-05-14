/**
203. 移除链表元素
删除链表中等于给定值 val 的所有节点。

示例:

输入: 1->2->6->3->4->5->6, val = 6
输出: 1->2->3->4->5

*/


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
 var removeElements = function(head, val) {

    let heaader={};
    heaader.next = head;

    let cur = heaader;
    // 前面几行太重要了

    while(cur.next){
        let next = cur.next;

        if(next.val == val){
            cur.next = next.next;
            
        }else{
            cur = next
        }
    }



    return heaader.next;
};