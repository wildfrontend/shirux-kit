'use client';

import {
  CollapsibleMenu,
  CollapsibleMenuContent,
  CollapsibleMenuItem,
  CollapsibleMenuLink,
  CollapsibleMenuList,
  CollapsibleMenuTrigger,
} from '@shirux/rux-ui/components/collapsible-menu';
import {
  ChevronRight,
  Home,
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  Database,
  Shield,
  Bell,
  Mail,
  Calendar,
} from 'lucide-react';

/**
 * 基本用法範例
 * 展示 Collapsible Menu 的標準使用方式
 */
export const BasicUsageDemo = () => {
  return (
    <div className="bg-background w-64 rounded-lg border p-4">
      <CollapsibleMenu defaultOpenItems={['dashboard']}>
        <CollapsibleMenuList>
          <CollapsibleMenuItem value="home">
            <CollapsibleMenuTrigger>
              <Home className="h-4 w-4" />
              <span className="flex-1">首頁</span>
              <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible-menu-item:rotate-90" />
            </CollapsibleMenuTrigger>
            <CollapsibleMenuContent>
              <CollapsibleMenuList>
                <li>
                  <CollapsibleMenuLink href="#" isActive>
                    概覽
                  </CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">最近活動</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">我的最愛</CollapsibleMenuLink>
                </li>
              </CollapsibleMenuList>
            </CollapsibleMenuContent>
          </CollapsibleMenuItem>

          <CollapsibleMenuItem value="dashboard">
            <CollapsibleMenuTrigger>
              <LayoutDashboard className="h-4 w-4" />
              <span className="flex-1">儀表板</span>
              <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible-menu-item:rotate-90" />
            </CollapsibleMenuTrigger>
            <CollapsibleMenuContent>
              <CollapsibleMenuList>
                <li>
                  <CollapsibleMenuLink href="#">分析</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">報告</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">統計</CollapsibleMenuLink>
                </li>
              </CollapsibleMenuList>
            </CollapsibleMenuContent>
          </CollapsibleMenuItem>

          <CollapsibleMenuItem value="users">
            <CollapsibleMenuTrigger>
              <Users className="h-4 w-4" />
              <span className="flex-1">用戶管理</span>
              <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible-menu-item:rotate-90" />
            </CollapsibleMenuTrigger>
            <CollapsibleMenuContent>
              <CollapsibleMenuList>
                <li>
                  <CollapsibleMenuLink href="#">所有用戶</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">用戶群組</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">權限設定</CollapsibleMenuLink>
                </li>
              </CollapsibleMenuList>
            </CollapsibleMenuContent>
          </CollapsibleMenuItem>

          <CollapsibleMenuItem value="settings">
            <CollapsibleMenuTrigger>
              <Settings className="h-4 w-4" />
              <span className="flex-1">設定</span>
              <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible-menu-item:rotate-90" />
            </CollapsibleMenuTrigger>
            <CollapsibleMenuContent>
              <CollapsibleMenuList>
                <li>
                  <CollapsibleMenuLink href="#">一般設定</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">安全性</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">通知</CollapsibleMenuLink>
                </li>
              </CollapsibleMenuList>
            </CollapsibleMenuContent>
          </CollapsibleMenuItem>
        </CollapsibleMenuList>
      </CollapsibleMenu>
    </div>
  );
};

/**
 * 控制開啟項目範例
 * 展示如何控制哪些項目預設開啟
 */
export const ControlledOpenItemsDemo = () => {
  return (
    <div className="bg-background w-64 rounded-lg border p-4">
      <CollapsibleMenu defaultOpenItems={['content', 'data']}>
        <CollapsibleMenuList>
          <CollapsibleMenuItem value="content">
            <CollapsibleMenuTrigger>
              <FileText className="h-4 w-4" />
              <span className="flex-1">內容管理</span>
              <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible-menu-item:rotate-90" />
            </CollapsibleMenuTrigger>
            <CollapsibleMenuContent>
              <CollapsibleMenuList>
                <li>
                  <CollapsibleMenuLink href="#">文章</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">頁面</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">媒體庫</CollapsibleMenuLink>
                </li>
              </CollapsibleMenuList>
            </CollapsibleMenuContent>
          </CollapsibleMenuItem>

          <CollapsibleMenuItem value="data">
            <CollapsibleMenuTrigger>
              <Database className="h-4 w-4" />
              <span className="flex-1">資料管理</span>
              <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible-menu-item:rotate-90" />
            </CollapsibleMenuTrigger>
            <CollapsibleMenuContent>
              <CollapsibleMenuList>
                <li>
                  <CollapsibleMenuLink href="#">匯入資料</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">匯出資料</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">備份</CollapsibleMenuLink>
                </li>
              </CollapsibleMenuList>
            </CollapsibleMenuContent>
          </CollapsibleMenuItem>

          <CollapsibleMenuItem value="security">
            <CollapsibleMenuTrigger>
              <Shield className="h-4 w-4" />
              <span className="flex-1">安全性</span>
              <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible-menu-item:rotate-90" />
            </CollapsibleMenuTrigger>
            <CollapsibleMenuContent>
              <CollapsibleMenuList>
                <li>
                  <CollapsibleMenuLink href="#">登入記錄</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">雙因素驗證</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">API 金鑰</CollapsibleMenuLink>
                </li>
              </CollapsibleMenuList>
            </CollapsibleMenuContent>
          </CollapsibleMenuItem>
        </CollapsibleMenuList>
      </CollapsibleMenu>
    </div>
  );
};

/**
 * 單選模式範例
 * 一次只能開啟一個項目
 */
export const SingleOpenDemo = () => {
  return (
    <div className="bg-background w-64 rounded-lg border p-4">
      <CollapsibleMenu defaultOpenItems={['notifications']} multiple={false}>
        <CollapsibleMenuList>
          <CollapsibleMenuItem value="notifications">
            <CollapsibleMenuTrigger>
              <Bell className="h-4 w-4" />
              <span className="flex-1">通知設定</span>
              <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible-menu-item:rotate-90" />
            </CollapsibleMenuTrigger>
            <CollapsibleMenuContent>
              <CollapsibleMenuList>
                <li>
                  <CollapsibleMenuLink href="#">
                    電子郵件通知
                  </CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">推播通知</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">簡訊通知</CollapsibleMenuLink>
                </li>
              </CollapsibleMenuList>
            </CollapsibleMenuContent>
          </CollapsibleMenuItem>

          <CollapsibleMenuItem value="messages">
            <CollapsibleMenuTrigger>
              <Mail className="h-4 w-4" />
              <span className="flex-1">訊息</span>
              <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible-menu-item:rotate-90" />
            </CollapsibleMenuTrigger>
            <CollapsibleMenuContent>
              <CollapsibleMenuList>
                <li>
                  <CollapsibleMenuLink href="#">收件匣</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">已傳送</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">草稿</CollapsibleMenuLink>
                </li>
              </CollapsibleMenuList>
            </CollapsibleMenuContent>
          </CollapsibleMenuItem>

          <CollapsibleMenuItem value="calendar">
            <CollapsibleMenuTrigger>
              <Calendar className="h-4 w-4" />
              <span className="flex-1">行事曆</span>
              <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible-menu-item:rotate-90" />
            </CollapsibleMenuTrigger>
            <CollapsibleMenuContent>
              <CollapsibleMenuList>
                <li>
                  <CollapsibleMenuLink href="#">我的行事曆</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">共享行事曆</CollapsibleMenuLink>
                </li>
                <li>
                  <CollapsibleMenuLink href="#">事件</CollapsibleMenuLink>
                </li>
              </CollapsibleMenuList>
            </CollapsibleMenuContent>
          </CollapsibleMenuItem>
        </CollapsibleMenuList>
      </CollapsibleMenu>
    </div>
  );
};
