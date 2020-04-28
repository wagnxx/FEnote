/**
 * 
 * 
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。
 * 
 * 
 * 示例 1:

输入: [1,3,5,6], 5
输出: 2
示例 2:

输入: [1,3,5,6], 2
输出: 1
示例 3:

输入: [1,3,5,6], 7
输出: 4
示例 4:

输入: [1,3,5,6], 0
输出: 0

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/search-insert-position
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 * 
 * 
 */


 /**
  * 自己写的

var searchInsert = function(nums, target) {

    if(target<nums[0]) return 0;
    if(target>nums[nums.length-1]) return nums.length;

    let hashObj={};
    for(let i=0;i<nums.length;i++){
            hashObj[nums[i]]=i
    }
    if(hashObj[target] == undefined ){
        // let entries = Object.entries(hashObj);
        for(let i=0;i<nums.length;i++){
             if(target>nums[i] && target< nums[i+1]){
                 return i+1;
             }
        }
        // return
    }   


    return hashObj[target]
};
  * 
  * 
  * 
  * 
  * 
  * 
  * 
  */





  /**
   * 网上热门做饭
   *  public int searchInsert(int[] nums, int target) {
        //简单的二分查找
        if (nums == null || nums.length == 0) {
            return 0;
        }
        //小知识点： java数组的最大长度为int的最大值
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (target == nums[mid]) {
                return mid;
            } else if (target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        //此时left = right
        return target <= nums[left] ? left : left + 1;
    }
   * 
   * 
   * 
   */